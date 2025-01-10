import AddPost from "@/components/AddPost"
import AllPost from "@/components/AllPost"
import LeftSideMenu from "@/components/LeftSideMenu"
import RightSideMenu from "@/components/RightSideMenu"
import Stories from "@/components/Stories"

const Homepage = () => {
  return (
    <div className='flex gap-6 pt-6'>
      <div className="hidden xl:block w-[20%]">
        <LeftSideMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <AllPost />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><RightSideMenu /></div>
    </div>
  )
}

export default Homepage