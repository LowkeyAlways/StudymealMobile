-- Tendance publique, calculée uniquement à partir des signalements récents.
-- Aucune identité d'utilisateur n'est renvoyée à l'application.
create or replace function public.get_crowd_trend(target_place_id text)
returns table (
  level text,
  report_count bigint,
  last_reported_at timestamptz,
  confidence text
)
language sql
stable
security definer
set search_path = public
as $$
  with recent_reports as (
    select level, created_at
    from public.crowd_reports
    where place_id = trim(target_place_id)
      -- Au-delà de 45 minutes, une information n'est plus présentée comme récente.
      and created_at > now() - interval '45 minutes'
  ), scored_reports as (
    select
      created_at,
      case level
        when 'quiet' then 1
        when 'moderate' then 2
        when 'busy' then 3
      end as score
    from recent_reports
  )
  select
    case
      when count(*) = 0 then null
      when avg(score) < 1.67 then 'quiet'
      when avg(score) < 2.34 then 'moderate'
      else 'busy'
    end as level,
    count(*) as report_count,
    max(created_at) as last_reported_at,
    case
      when count(*) = 0 then 'none'
      when count(*) < 3 then 'low'
      when count(*) < 6 then 'medium'
      else 'high'
    end as confidence
  from scored_reports;
$$;

revoke all on function public.get_crowd_trend(text) from public;
grant execute on function public.get_crowd_trend(text) to authenticated;
