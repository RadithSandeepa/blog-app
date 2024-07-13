import React from 'react'
import { Link } from 'react-router-dom';
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu';

const Single = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
      <div className="user">
        <img src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
      <div className="info">
        <span>John</span>
        <p>Posted 2 days ago</p>
      </div>
      <div className="edit">
        <Link to={`/write?edit=2`}>
          <img src={Edit} alt="" />
        </Link>
        <img src={Delete} alt="" />
      </div>
      </div>
      <h1>Lorem, ipsum dolor sit amet consectetur adipisicing.</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam recusandae 
        sapiente iure vero reiciendis ea dolorum quos assumenda, cupiditate ipsum 
        omnis corporis magnam sit quo impedit qui, incidunt amet sint culpa corrupti 
        itaque asperiores ad. Esse consectetur deserunt eligendi saepe non perspiciatis, 
        ipsam illum veniam nisi magni reprehenderit? Voluptatem dolorum maxime fugit culpa
        aliquam eos voluptate, nulla dolor nemo laudantium voluptatibus necessitatibus sed, 
        pariatur illo laboriosam eaque veniam quisquam suscipit! Quidem eligendi inventore quia, 
        illo, voluptate libero culpa nemo distinctio tempora perspiciatis enim maiores praesentium f
        acilis esse accusamus aliquid alias ab ipsa pariatur! Eligendi ex omnis quidem. Illum, quae. 
        In, veniam aliquid accusamus harum quidem, cumque praesentium adipisci sunt itaque esse dolores 
        maiores saepe ratione reiciendis porro blanditiis nam eos non consequatur rerum quo aspernatur. <br /><br />
        Nostrum ab rerum necessitatibus inventore dolorem, culpa natus temporibus enim ut iste nam provident quae 
        laboriosam est fugiat praesentium amet labore harum sint voluptates quaerat, aspernatur consequuntur? 
        Perferendis nihil ipsum, excepturi dolorum saepe aut tempore labore velit. Facere rem tempora, blanditiis 
        molestias reiciendis atque sed quos possimus numquam in! Assumenda saepe dolor distinctio eius quisquam 
        aperiam sequi non fugiat alias. Aut, pariatur ipsum. Blanditiis assumenda exercitationem id ex iure 
        distinctio beatae dignissimos, dicta modi eos dolorem illo atque incidunt repellendus laborum neque 
        quod praesentium in aut consequuntur! Doloremque, laboriosam ipsam! Cum similique illo soluta minus quia 
        minima iusto quod corporis atque perferendis quis aliquam quaerat distinctio, porro ex necessitatibus vero 
        eligendi non sunt labore odio.<br /><br /> Asperiores sapiente et, consequuntur odit, exercitationem libero corrupti, 
        nemo laborum recusandae itaque adipisci veritatis illum velit vel doloremque eos. Minima deleniti ut, ullam 
        tenetur quis minus delectus sequi eveniet corporis explicabo beatae tempore, incidunt, quas laborum doloremque
         nisi atque. Explicabo commodi nihil repellat, velit provident nulla quae odit 
        ut neque pariatur facilis dolorum voluptatibus. Ut illo illum maxime impedit ab?
      </p>
      </div>
      <Menu />
    </div>
  )
}

export default Single