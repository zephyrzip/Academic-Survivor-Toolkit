function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="page-heading__description">{description}</p> : null}
      </div>
      {actions ? <div className="page-heading__actions">{actions}</div> : null}
    </div>
  )
}

export default PageHeader
