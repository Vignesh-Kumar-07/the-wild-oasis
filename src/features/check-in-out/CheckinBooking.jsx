/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmCheck, setConfirmCheck] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isCheckin, checkin } = useCheckin();

  const { settings, isLoading: isSettingLoading } = useSetting();

  // console.log(settings, "settings");
  // console.log(booking);

  useEffect(
    function () {
      setConfirmCheck(booking?.isPaid || false);
    },
    [booking?.isPaid],
  );
  if (isLoading || isSettingLoading) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // console.log(booking);

  const optionalBreakfast = settings?.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmCheck) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          totalPrice: optionalBreakfast + totalPrice,
          extrasPrice: optionalBreakfast,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setConfirmCheck(false);
              setAddBreakfast((confirm) => !confirm);
            }}
            id="breakfase"
            // disabled={confirmCheck}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmCheck}
          onChange={() => setConfirmCheck((confirm) => !confirm)}
          id="confirm"
          disabled={confirmCheck}
        >
          I confirm that {guests?.fullName} has paid the total amount{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)}+ ${formatCurrency(optionalBreakfast)} )`
            : formatCurrency(totalPrice)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmCheck || isCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
