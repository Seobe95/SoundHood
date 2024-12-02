import { Post } from '@/api';
import { useState } from 'react';

function useEditPostHandler(data: Post) {
  const [description, setDescription] = useState(data.description ?? '');
  const onChangeText = (text: string) => setDescription(text);

  const invalid = description === '' || description === data?.description;

  const contentInputProps = {
    value: description,
    onChangeText,
  };

  return { contentInputProps, invalid };
}

export default useEditPostHandler;
