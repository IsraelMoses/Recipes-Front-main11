import Header from "../header/Header";
import "./MainPage.css";
// import "./queries.css";
import Heading from "../Heading/Heading";

export interface MainPageProps {
  goToPersonalArea: () => void;
  goToSearch: () => void;
  goToShare: () => void;
  goToLogin: () => void;
  goToRegister: () => void;
  goToMyTrips: () => void;
  endaleLogOut: () => void;
  isUserConnected: boolean;
  userName: string;
  imgUrl: string;
}

function MainPage({
  userName,
  imgUrl,
  goToPersonalArea,
  goToSearch,
  goToShare,
  isUserConnected,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: MainPageProps) {
  return (
    <section className="main-page-section">
      <Header
        goToPersonalArea={goToPersonalArea}
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToShare={goToShare}
        goToMyTrips={goToMyTrips}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      <div className="hero-section">
        <Heading text ="The best recipe site in the world" />
        
        
        <div className="buttons-container">
        <button className="btn large-btn" onClick={goToShare}>
               Share recipe
         </button>
         <button className="btn large-btn" onClick={goToSearch}>
               Search recipe
         </button>

        </div>
      </div>
    </section>
  );
}

export default MainPage;
