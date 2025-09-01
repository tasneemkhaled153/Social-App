
import PostsList from '../../../components/posts/PostsList'
import Add from './../../../components/posts/Add';
import ProfileCard from './../../../components/profile/ProfileCard';

export default function Profile() {

  return (
    <>
    <section className='max-w-xl mx-auto py-12'>
    <div className='flex flex-col gap-4'>
    <Add></Add>
    <ProfileCard/>
    <PostsList isProfile={true}/>
    </div>
    </section>
    
    
    </>
  )
}
