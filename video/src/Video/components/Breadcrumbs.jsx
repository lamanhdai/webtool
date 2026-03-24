import { Link } from 'react-router-dom'

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-white' : ''}>{item.label}</span>
              )}
              {!isLast ? <span className="text-slate-500">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
