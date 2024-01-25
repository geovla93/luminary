import {useAppSelector} from '@redux/hook';

const useContacts = () => {
  const {contacts} = useAppSelector(state => state.contacts);
  return {
    contacts,
  };
};

export default useContacts;
