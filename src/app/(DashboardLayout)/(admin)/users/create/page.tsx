import BtnBack from '@/components/admin/users/BtnBack'
import Form from '@/components/admin/teachers/create/Form'

function UsersCreatePage() {
  return (
    <div className="flex flex-col gap-2 w-auto">
      <div className='w-auto'>
        <BtnBack route={'/users/list'} />
      </div>
      <Form></Form>
    </div>
  )
}

export default UsersCreatePage
