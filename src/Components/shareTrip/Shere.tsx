import { useEffect, useState } from "react";
import Header from "../header/Header";
import HeadingSecondry from "../headingSecondry/HeadingSecondry";
import TypesTravelers from "./TypesTravelers";
import TypeTrip from "./TypeTrip";
import NumOfDays from "./NumOfDays";
import Description from "./Description";
import SuccessfulCompletion from "./SuccessfulCompletion";
import TripsService, { ITrips } from "../../services/tripsService";
import "../../queries.css";

export interface ShareProps {
  imgUrl: string;
  userName: string;
  isUserConnected: boolean;
  goToPersonalArea: () => void;
  goToMainPage: () => void;
  goToShare: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToMyTrips: () => void;
  goToSearch: () => void;
  endaleLogOut: () => void;
}

function Share({
  isUserConnected,
  imgUrl,
  userName,
  goToPersonalArea,
  goToMainPage,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: ShareProps) {
  const [isNumOfDaysSelected, setIsNumOfDaysSelected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState(false);
  const [finish, setFinish] = useState(false);
  const [isTravelerTypeSelected, setIsTravelerTypeSelected] = useState(false);
  const [selectedTravelerType, setSelectedTravelerType] = useState<
    string | null
  >(null);

  // 1
  const [isTripTypeSelected, setIsTripTypeSelected] = useState(false);
  // 2
  const [selectedTripType, setSelectedTripType] = useState<string | null>(null);
  // 3
  const [numOfDays, setNumOfDays] = useState(0);
  // 4
  const [country, setCountry] = useState<string | null>(null);
  // 5
  const [description, setDescription] = useState<string[]>([]);
  // 6
  const [tripPhotos, setTripPhotos] = useState<string[]>([]);

  const updateTripPhotos = (newPhotos: string[]) => {
    setTripPhotos(newPhotos);
  };

  const updateDescriptions = (newDescriptions: string[]) => {
    setDescription(newDescriptions);
    console.log(description);
  };

  useEffect(() => {}, [description]);

  const handleCountrySelect = (country: string) => {
    console.log("Selected Country:", country);
    if (country !== null) {
      setSelectedCountry(true);
      setCountry(country);
    }
  };

  const onClickLeftArrow1 = () => {
    if (selectedTravelerType) setIsTravelerTypeSelected(true);
  };

  const onClickLeftArrow2 = () => {
    if (selectedTripType) setIsTripTypeSelected(true);
  };

  const onClickLeftArrow3 = (days: number) => {
    if (numOfDays > 0 && selectedCountry) setIsNumOfDaysSelected(true);
    setNumOfDays(days);
  };

  const onClickRightArrow1 = () => {
    goToMainPage();
  };

  const onClickRightArrow2 = () => {
    setIsTravelerTypeSelected(false);
  };

  const onClickRightArrow3 = () => {
    setIsTripTypeSelected(false);
  };

  const onClickRightArrow4 = () => {
    setIsNumOfDaysSelected(false);
  };

  const onClickButtonTypeTraveler = (TravelerType: string) => {
    setSelectedTravelerType(TravelerType);
  };

  const onClickButton2 = (TripType: string) => {
    setSelectedTripType(TripType);
  };
  const onClickLastDay = async (num: number) => {
    if (num === numOfDays) {
      setFinish(true);
    }
  };
  const newtrip: ITrips = {
    userName: userName,
    imgUrl: imgUrl,
    typeTraveler: selectedTravelerType ?? "",
    country: country ?? "",
    typeTrip: selectedTripType ?? "",
    numOfDays: numOfDays,
    tripDescription: description,
    numOfComments: 0,
    numOfLikes: 0,
    tripPhotos: tripPhotos,
  };

  const send = async () => {
    try {
      const response = await TripsService.postTrip(newtrip);
      console.log(response); // להדפיס את התגובה או להשתמש בה לפעולה הבאה
      setSendSuccessMessage(true);
    } catch (error) {
      console.error("Failed to post recipe:", error);
      // טיפול בשגיאה, למשל על ידי הצגת הודעה למשתמש
    }
  };
  const onClickHomePage = () => {
    goToMainPage();
  };

  const HeadingSecondryClassName = !sendSuccessMessage
    ? "heading-secondry"
    : "heading-secondry-hidden";

  return (
    <>
      <Header
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToPersonalArea={goToPersonalArea}
        goToShare={goToShare}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToMyTrips={goToMyTrips}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      <section className="hero-section">
        <div className={HeadingSecondryClassName}>
          <HeadingSecondry text="Helping people create an amazing travel experience!" />
        </div>
        {!isTravelerTypeSelected ? (
          <TypesTravelers
            onClickLeftArrow={onClickLeftArrow1}
            onClickRightArrow={onClickRightArrow1}
            onClickButtonTypeTraveler={onClickButtonTypeTraveler}
            clickedTypeTravelerId={selectedTravelerType}
          />
        ) : !isTripTypeSelected ? (
          <TypeTrip
            onClickRightArrow={onClickRightArrow2}
            onClickLeftArrow={onClickLeftArrow2}
            onClickButtonTypeTrip={onClickButton2}
            clickedTypeTripId={selectedTripType}
          />
        ) : !isNumOfDaysSelected ? (
          <NumOfDays
            onCountrySelect={handleCountrySelect}
            onClickSave={onClickLeftArrow3}
            onClickRightArrow={onClickRightArrow3}
          />
        ) : !sendSuccessMessage ? (
          <Description
            finish={finish}
            handleFinish={send}
            onClickLastDay={onClickLastDay}
            dayNumber={numOfDays}
            onClickRightArrow={onClickRightArrow4}
            updateDescriptions={updateDescriptions}
            updateTripPhotos={updateTripPhotos}
          />
        ) : (
          <SuccessfulCompletion
            title="Congratulations"
            secondaryTitle="Your recipe will help users to cook with ease!"
            text=" Thank you for sharing your cooking experience with our community.
                     Your insight is invaluable and helps others to enjoy their meals even more. Keep exploring and sharing!"
            buttonText="home page"
            onClickHomePage={onClickHomePage}
          />
        )}
      </section>
    </>
  );
}

export default Share;
