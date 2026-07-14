function ConfirmDeleteModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="form-actions">
          <button type="button" className="danger-btn" onClick={onConfirm}>
            Delete
          </button>
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
