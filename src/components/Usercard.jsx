const Usercard =({user}) =>{
    console.log(user);
    const {name,age,photoUrl,gender,about,skills}=user;
    return <div>
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="UserImg" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{user?.email}</p>
    {age && gender && <p>{age+","+gender}</p>}
    {about && (<p>{user?.about}</p>)}
    {skills && (<p><b>Skills: </b>{skills+" "}</p>)}
    <div className="card-actions justify-end">
    <button className="btn btn-primary text-white">Ignore</button>
      <button className="btn btn-primary bg-green-800 text-white">Interested</button>
    </div>
  </div>
</div>
    </div>
}

export default Usercard;