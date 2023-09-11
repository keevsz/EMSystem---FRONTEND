import BtnBack from '@/components/common/BtnBack'
import Form from '@/components/admin/teachers/create/Form'

function UsersCreatePage() {
  return (
    <div className="flex gap-5">
      <div className='w-auto'>
        <BtnBack route={'/users'} />
      </div>
      <div className='w-full'>
        <Form/>
      </div>
    </div>
  )
}

export default UsersCreatePage
