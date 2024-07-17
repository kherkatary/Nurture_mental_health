import './Login.scss'
import { Player } from '@lottiefiles/react-lottie-player'
import loginAnimation from '../../assets/loginAnimation.json'
import { LoginForm } from '../../Components'

const Login = () => {

  return (
    <div className='login'>
      <div className="display centerElements">
        <div className="loginAni">
          <Player src={loginAnimation} autoplay loop/>
        </div>
      </div>
      <div className="logForm centerElements">
        <LoginForm type="Login" />
      </div>
    </div>

  )
}

export default Login