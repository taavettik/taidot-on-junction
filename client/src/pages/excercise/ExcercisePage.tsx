import React from 'react';
import { Text } from '../../components/Text';
import { Stack } from '../../components/Stack';
import styled from 'styled-components';
import step1header from './step1header.png';
import step2header from './step2header.png';
import sitting from './sitting.png';
import jumping from './jumping.png';
import confetti from './confetti.png';
import ConfettiGenerator from 'confetti-js';
import streak from '../../../assets/dashboard/streak.png';
import chatPerson from '../../../assets/dashboard/chatPerson.png';
import { Button } from '../../components/Button';
import { BiChevronRight } from 'react-icons/bi';
import { Link, useNavigate } from '@tanstack/react-router';
import { FaStar } from 'react-icons/fa';

export function ExcercisePage() {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate({ from: '/' });

  React.useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        setStep(4);
      }, 3000);
    }
  }, [step]);

  React.useEffect(() => {
    if (step === 3) {
      const confettiSettings = { target: 'confetti-canvas' };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();

      return () => confetti.clear();
    }
  });

  return (
    <>
      {step !== 3 && (
        <Container>
          <Stack axis="y" spacing={20}>
            {step === 1 && (
              <>
                <img src={step1header} />
                <Text variant={'bodyBold'}> Let’s get moving!</Text>

                <img src={jumping} />
                <Text variant="body">
                  Let’s do a simple and effective dumbbell exercise - Standing
                  Knee Extension with Dumbbells. This exercise takes about 20
                  minutes.
                </Text>
                <Button
                  text="Next"
                  icon={BiChevronRight}
                  onClick={() => {
                    setStep(2);
                  }}
                />
              </>
            )}
            {step === 2 && (
              <>
                <img src={step2header} />
                <Text variant={'bodyBold'}> Let’s get moving!</Text>
                <Stack axis="y" spacing={10}>
                  <Text variant="body">
                    A simple exercise for addressing chronic pain is the
                    Standing Knee Extension. This exercise helps improve
                    balance, stability, and activates the muscles in your legs
                    without putting excessive strain on your joints.
                  </Text>
                  <Text variant="body">
                    If you want to add resistance, you can hold onto light
                    dumbbells in each hand. Lift one knee toward your chest,
                    keeping the movement controlled and deliberate.
                  </Text>
                </Stack>
                <img src={sitting} />
                <Button
                  text="Mark complete"
                  icon={BiChevronRight}
                  onClick={() => {
                    setStep(3);
                  }}
                />
              </>
            )}
            {[1, 2].includes(step) && (
              <StyledLink to="/chat">
                <Stack
                  axis="x"
                  spacing={4}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Need Motivation or Tips?
                  <BiChevronRight size={'24px'} color={'black'} />
                </Stack>
              </StyledLink>
            )}
            {step === 4 && (
              <SummaryContent axis="y" spacing={30}>
                <StyledImage src={jumping} />
                <Text variant={'bodyBold'}>How did you find the exercise?</Text>

                <Stack axis="x" spacing={10}>
                  <FaStar size={24} color={'black'} />
                  <FaStar size={24} color={'black'} />
                  <FaStar size={24} color={'black'} />
                  <FaStar size={24} color={'black'} />
                  <FaStar size={24} color={'black'} />
                </Stack>
                <Text variant={'bodyBold'}>Feedback</Text>
                <ButtonContainer>
                  <StyledButton text="Easy" />
                  <StyledButton text="Boring" />
                  <StyledButton text="Difficult" />
                  <StyledButton text="Hard" />
                  <StyledButton text="Refreshing" />
                  <StyledButton text="Innovative" />
                  <StyledButton text="Fun" />
                </ButtonContainer>
                <Button
                  style={{ width: '100%' }}
                  text="Done"
                  icon={BiChevronRight}
                  onClick={() => {
                    setStep(5);
                  }}
                />
                <StyledLink to="/">
                  <Stack
                    axis="x"
                    spacing={4}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Skip
                    <BiChevronRight size={'24px'} color={'black'} />
                  </Stack>
                </StyledLink>
              </SummaryContent>
            )}
            {step === 5 && (
              <SummaryContent axis="y" spacing={30}>
                <StyledImage src={jumping} />
                <Text variant={'bodyBold'}>Did you experience any pain?</Text>

                <ButtonContainer>
                  <StyledButton text="Yes" />
                  <Button text="No" />
                  <StyledButton text="I'm not sure" />
                </ButtonContainer>
                <Text variant={'bodyBold'}>
                  Great to hear that there’s no pain!
                </Text>
                <Text variant={'body'}>
                  Remember, that if you are feeling any pain, let’s adjust your
                  healthcare plan!
                </Text>
                <StyledLink to="/">
                  <Stack
                    axis="x"
                    spacing={4}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Adjust exercise plan
                    <BiChevronRight size={'24px'} color={'black'} />
                  </Stack>
                </StyledLink>
                <Button
                  style={{ width: '100%' }}
                  text="Done"
                  icon={BiChevronRight}
                  onClick={() => {
                    navigate({ to: '/' });
                  }}
                />
                <StyledLink to="/">
                  <Stack
                    axis="x"
                    spacing={4}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Skip
                    <BiChevronRight size={'24px'} color={'black'} />
                  </Stack>
                </StyledLink>
              </SummaryContent>
            )}
          </Stack>
        </Container>
      )}
      {step === 3 && (
        <>
          <Images>
            <ConfettiContainer id="confetti-canvas"></ConfettiContainer>
            <img
              src={confetti}
              style={{
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <img
              src={streak}
              style={{
                height: '250px',
                position: 'absolute',
                top: 100,
                left: '20%',
              }}
            />
          </Images>
          <Content axis="y" spacing={8}>
            <Text variant={'header'}> Great Job!</Text>
            <Text variant={'body'}> Your streak is incredible!</Text>
            <img src={chatPerson} />
          </Content>
        </>
      )}
    </>
  );
}

const ConfettiContainer = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const Images = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 385px;
`;

const Container = styled.div`
  overflow: scroll;
  padding: 24px 32px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

const Content = styled(Stack)`
  z-index: 101; /* set z-index higher than Images */
  position: absolute;
  background-color: white;
  top: 550px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 385px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  max-width: 50%;
`;

const SummaryContent = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.lightNeutral};
  margin: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
