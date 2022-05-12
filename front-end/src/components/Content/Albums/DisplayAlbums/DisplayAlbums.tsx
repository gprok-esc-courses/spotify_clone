import { Box, Paper, Text } from "@mantine/core";
import { useEffect } from "react";
import { useAlbumState } from "../../../../context/AlbumContext";
import { useUserState } from "../../../../context/UserContext";
import { IAlbumInfoContext } from "../../../../Model/models";
import styles from "./DisplayAlbums.module.css";

const DisplayAlbums: React.FC = () => {
  const { user } = useUserState();

  const albumState = useAlbumState();
  return (
    <Box mx="auto">
      {albumState.albums.map((album: IAlbumInfoContext, index: number) => (
        <Paper className={`${styles.task_container} `} key={index}>
          {/* Change complete status of a task. If task is completed, keep checked on */}

          <Text size="md" color={"white"} weight={500}>
            {album.name}
          </Text>
        </Paper>
      ))}
    </Box>
  );
};
export default DisplayAlbums;
