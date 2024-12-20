import ChatBotBox from '@/components/chatbot/ui'
import Navbar from '@/components/navbar/Navbar'
import BottomBar from '@/components/sidebar/BottomBar'
import Sidebar from '@/components/sidebar/Sidebar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className='sm:block hidden'>
        <Sidebar />
      </div>
      <div className="w-auto p-4 sm:ml-64  flex justify-center bg-slate-100 min-h-screen">
        <div className="container p-10 mt-14 bg-white rounded-xl min-h-full">
          {children}
        </div>

        <div className='sm:hidden block'>
          <BottomBar />
        </div>
      </div>
    </div>
  )
}
