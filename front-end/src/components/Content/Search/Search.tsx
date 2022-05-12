import { Box, Button, Group, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { searchAlbumsAPI } from "../../../API/Api";
import { useAlbumState } from "../../../context/AlbumContext";
import { useUserState } from "../../../context/UserContext";

const Search: React.FC = () => {
  // Check if there are any error messages at all
  const [errorMessage, setErrorMessage] = useState<any>();

  // Destructure and get user
  const { user } = useUserState();

  const { albums } = useAlbumState();

  // get album name user searched for
  const [albumName, setAlbumName] = useState<string>("");

  // set "albumName" state input
  const onHandleSearchAlbum = (e: React.BaseSyntheticEvent) => {
    setAlbumName(e.target.value);
  };

  const handleInputs = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      if (albumName.trim() !== "") {
        const searchedAlbumData = await searchAlbumsAPI(user, albumName);
        // Check the type of the data is returned, if is string, it contains a message which means error and display error
        // If data is not string, it contains user's information (token, id, email) and the login was successful
        if (
          typeof searchedAlbumData === "string" ||
          searchedAlbumData instanceof String
        ) {
          setErrorMessage(searchedAlbumData);
        } else {
          console.log(searchedAlbumData);
        }
      }
      // Clear input form and albumName state
      setAlbumName("")
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <Box sx={{ maxWidth: 540 }} mx="auto">

      <form
        // values: current form values
        onSubmit={handleInputs}
      >
        <TextInput
          placeholder="Search for albums.."
          value={albumName}
          onChange={onHandleSearchAlbum}
        />

        <Group position="right" mt="md">
          <Button color="green" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default Search;
