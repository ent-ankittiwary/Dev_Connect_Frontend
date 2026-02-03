const Usercard =({user}) =>{
    // console.log(user);
    const {name,age,photoUrl,gender,about,skills,gmail}=user
    return <div>
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={user.photoUrl}
      alt="UserImg" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.name}</h2>
    <p>{user.email}</p>
    {age && gender && <p>{age+","+gender}</p>}
    <div className="card-actions justify-end">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary bg-green-800">Interested</button>
    </div>
  </div>
</div>
    </div>
}

export default Usercard;