'use client'
import BackIcon from './BackIcon'
function BtnBackComponent() {
  return (
    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
      <div className="w-8">
        <BackIcon />
      </div>
    </span>
  )
}

export default BtnBackComponent
