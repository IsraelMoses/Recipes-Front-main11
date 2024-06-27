import React, { useEffect, useState } from "react";
import tripsService, {
  ITrips,
  IUpdateTrips,
} from "../../services/tripsService";
import Header from "../header/Header";
import RightArrow from "../icons/RightArrowIcon";
import SuccessfulCompletion from "../shareTrip/SuccessfulCompletion";

export interface UpdateTripProps {
  tripId: string;
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

function UpdateTrip({
  tripId,
  isUserConnected,
  imgUrl,
  userName,
  goToPersonalArea,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
}: UpdateTripProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [tripIsUpdated, setTripIsUpdated] = useState(false);
  const [tripDetails, setTripDetails] = useState<ITrips>();

  const onClickRightArrow = () => {
    goToMyTrips();
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const newTrip = await tripsService.getByTripId(tripId);
        setTripDetails(newTrip);
        setDescriptions(newTrip.tripDescription);
      } catch (err) {
        console.log("Error fetching updated recipe:", err);
      }
    };

    fetchTripDetails();
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    dayIndex: number
  ) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[dayIndex] = e.target.value;
    setDescriptions(updatedDescriptions);
  };

  const saveChanges = async () => {
    try {
      const updatedTrip: IUpdateTrips = {
        _id: tripId,
        tripDescription: descriptions,
      };
      await tripsService.updateTrip(updatedTrip);
      console.log("Recipe updated successfully!");
      setTripIsUpdated(true);
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

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

      {!tripIsUpdated ? (
        <div className="update-trip-details">
          <div className="right-arrow-icon">
            <RightArrow onClickRightArrow={onClickRightArrow} />
          </div>
          <h3 className="day-num">Day {currentDay + 1}</h3>
          <textarea
            className="update-description-box "
            value={descriptions[currentDay] || ""}
            onChange={(e) => handleDescriptionChange(e, currentDay)}
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              fontFamily: "Arial, sans-serif",
            }}
          ></textarea>
          <div className="update-buttons">
            <button
              className="options"
              onClick={() =>
                setCurrentDay((prev) =>
                  Math.min(
                    prev + 1,
                    (tripDetails && tripDetails.tripDescription?.length - 1) ||
                      0
                  )
                )
              }
            >
              Next Day
            </button>
            <button
              className="options"
              onClick={() => setCurrentDay((prev) => Math.max(prev - 1, 0))}
            >
              Previous Day
            </button>
          </div>
          <button className="save-changes-btn" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      ) : (
        <div className="update-trip-details">
          <SuccessfulCompletion
            title="Update Successful"
            secondaryTitle="Your Travel Update Enhances the Journey for All!"
            text=" We appreciate your commitment to refining your travel experience for the benefit of our community! "
            onClickHomePage={goToMyTrips}
            buttonText="my trips"
          />
        </div>
      )}
    </>
  );
}

export default UpdateTrip;
