import Image from 'next/image';
import RDSImage from '../../../public/rayitos_del_sol.png'
function DashboardPage() {
  return <div>
    <Image src={RDSImage} width={500} height={200} alt='Rayitos de sol'></Image>
  </div>
}

export default DashboardPage
