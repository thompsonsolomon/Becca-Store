import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
  const Reverse = () => {
    navigate(-1)

  };
  return (
    <div style={Style.NotFoundCon}>
      The page you request can not be  found
      Please go back to the previous page or refresh
      <button className="errorPagebtn" onClick={Reverse}>Back</button>
    </div>
  )
}

const Style = {
  NotFoundCon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height:"100dvh",
    width:"100%",
    flexDirection:"column",
    gap:"20px"
  }
}
export default NotFound