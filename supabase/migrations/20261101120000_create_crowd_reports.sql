-- Signalements communautaires d'affluence.
-- Les lieux restent gérés localement dans l'application : place_id est donc une
-- référence texte plutôt qu'une clé étrangère vers une table places.
create table if not exists public.crowd_reports (
  id uuid primary key default gen_random_uuid(),
  place_id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  level text not null check (level in ('quiet', 'moderate', 'busy')),
  created_at timestamptz not null default now()
);

create index if not exists crowd_reports_place_created_at_idx
  on public.crowd_reports (place_id, created_at desc);

create index if not exists crowd_reports_user_place_created_at_idx
  on public.crowd_reports (user_id, place_id, created_at desc);

alter table public.crowd_reports enable row level security;

-- Aucun accès direct aux rapports : l'application passe par la fonction ci-dessous.
-- Cela évite notamment d'exposer l'identité des étudiants ayant contribué.
revoke all on table public.crowd_reports from anon, authenticated;

create or replace function public.submit_crowd_report(
  target_place_id text,
  reported_level text
)
returns public.crowd_reports
language plpgsql
security definer
set search_path = public
as $$
declare
  report public.crowd_reports;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if target_place_id is null or length(trim(target_place_id)) = 0 then
    raise exception 'A place is required';
  end if;

  if reported_level not in ('quiet', 'moderate', 'busy') then
    raise exception 'Invalid crowd level';
  end if;

  -- Empêche le spam tout en laissant une nouvelle contribution après dix minutes.
  if exists (
    select 1
    from public.crowd_reports
    where user_id = auth.uid()
      and place_id = target_place_id
      and created_at > now() - interval '10 minutes'
  ) then
    raise exception 'A report was already submitted recently for this place';
  end if;

  insert into public.crowd_reports (place_id, user_id, level)
  values (trim(target_place_id), auth.uid(), reported_level)
  returning * into report;

  return report;
end;
$$;

revoke all on function public.submit_crowd_report(text, text) from public;
grant execute on function public.submit_crowd_report(text, text) to authenticated;
