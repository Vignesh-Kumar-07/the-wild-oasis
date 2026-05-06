/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import { useTodayActivity } from "./useTodayActivity";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";
const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      <TodayList>
        {isLoading ? (
          <Spinner />
        ) : activities.length > 0 ? (
          activities?.map((activity, i) => (
            <TodayItem key={activity.id} activity={activity} />
          ))
        ) : (
          <NoActivity>No activities found toady...</NoActivity>
        )}
      </TodayList>
    </StyledToday>
  );
}

export default TodayActivity;
