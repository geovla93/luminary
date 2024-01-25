import {useAppDispatch, useAppSelector} from '@redux/hook';
import {
  IOnboardingState,
  IOnboardingStateTypes,
  setBackedUp,
  setCompleted,
  setState,
} from '@redux/slices/onboarding.slice';

interface IOnboarding {
  onboarding: IOnboardingState;
  setOnboardingState: (state: IOnboardingStateTypes) => void;
  setWalletBackedUp: (backedUp: boolean) => void;
  setOnboardingCompleted: (completed: boolean) => void;
}

const useOnboarding = (): IOnboarding => {
  const onboarding = useAppSelector(state => state.onboarding);
  const dispatch = useAppDispatch();

  const setOnboardingState = (state: IOnboardingStateTypes) => {
    dispatch(setState(state));
  };

  const setWalletBackedUp = (backedUp: boolean) => {
    dispatch(setBackedUp(backedUp));
  };

  const setOnboardingCompleted = (completed: boolean) => {
    dispatch(setCompleted(completed));
  };

  return {
    onboarding,
    setOnboardingState,
    setWalletBackedUp,
    setOnboardingCompleted,
  };
};

export default useOnboarding;
