import { useState } from 'react';
import { TextInput, Tooltip } from '@mantine/core';

export const Search = () => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      placeholder="Search"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="Additional information" position="top-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
  );
}