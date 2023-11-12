import React from 'react';
import { Card } from '../../components/Card';
import { Text } from '../../components/Text';
import streak from '../../../assets/dashboard/streak.png';
import chatPerson from '../../../assets/dashboard/chatPerson.png';
import { Stack } from '../../components/Stack';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { BiChevronRight } from 'react-icons/bi';
import { Link, useNavigate } from '@tanstack/react-router';

export function DashboardPage() {
  const navigate = useNavigate({ from: '/' });

  return (
    <Container>
      <Wrapper>
        <Stack axis="y" spacing={20}>
          <Text variant="header" color="darkPrimary">
            Welcome back, Julien!
          </Text>
          <CardContainer>
            <Stack axis="x" spacing={8}>
              <Stack axis="y" spacing={10}>
                <Text variant="bodyBold" color="darkPrimary">
                  You are doing great!
                </Text>
                <Text variant="bodySmall" color="darkPrimary">
                  Based on your body data, you are recovering well from your
                  exercises!
                </Text>
              </Stack>
              <CardImage src={streak} />
            </Stack>
          </CardContainer>
          <Card header="Todays exercise">
            <Stack axis="y" spacing={10}>
              <Text variant="bodySmall" color="darkPrimary">
                Not started yet. Start soon or you’ll lose your streak
              </Text>
              <Button
                text="Start"
                icon={BiChevronRight}
                onClick={() => {
                  navigate({ to: '/excercise' });
                }}
              />
            </Stack>
          </Card>
          <CardContainer>
            <Stack axis="x" spacing={8}>
              <Stack axis="y" spacing={10}>
                <Text variant="bodyBold" color="darkPrimary">
                  Looking for motivation?
                </Text>
                <StyledLink to="/chat">
                  <Stack
                    axis="x"
                    spacing={4}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    Open AI chat
                    <BiChevronRight size={'24px'} color={'black'} />
                  </Stack>
                </StyledLink>
              </Stack>
              <CardImage src={chatPerson} />
            </Stack>
          </CardContainer>
        </Stack>
      </Wrapper>
      <BottomInfo>
        <Stack axis="y" spacing={15}>
          <Text variant="bodyBold" color="darkPrimary" align="center">
            Connect with our community and learn more about living with chronic
            pain
          </Text>
          <Stack
            axis="x"
            spacing={4}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Join our community <BiChevronRight size={'24px'} color={'black'} />
          </Stack>
        </Stack>
      </BottomInfo>
    </Container>
  );
}

const Container = styled.div`
  overflow: scroll;
`;

const Wrapper = styled.div`
  padding: 24px 32px;
`;
const CardImage = styled.img`
  display: block;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: 'white';
  border: 1px solid #eee;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomInfo = styled.div`
  padding: 0;
  margin: 0;
  max-width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 32px;
`;
