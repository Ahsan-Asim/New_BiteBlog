import Header from "../Header"
import Profile_Grids from "./Profile_Grids"
import Profile_Main from "./Profile_Main"

const Profile = () => {
	return (
		<>
			<Header showAuthButtons={false} />
			<Profile_Main />
			<Profile_Grids />
		</>
	)
}

export default Profile
