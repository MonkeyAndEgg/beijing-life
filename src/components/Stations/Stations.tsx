import { Box, Button, Center, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useNextDay from "../../hooks/useNextDay";
import Card from "../Card/Card";

const ACTION_SWITCH_STATONS = 'switch stations';
const ACTION_NEXT_STATION = 'next station';
const ACTION_HIDING = 'hiding';
const STATIONS_LABELS_A = [
  { label: '我要逛京城', action: ACTION_SWITCH_STATONS },
  { label: '西直门', action: ACTION_NEXT_STATION },
  { label: '积水潭', action: ACTION_NEXT_STATION },
  { label: '东直门', action: ACTION_NEXT_STATION },
  { label: '苹果园', action: ACTION_NEXT_STATION },
  { label: '公主坟', action: ACTION_NEXT_STATION },
  { label: '复兴门', action: ACTION_NEXT_STATION },
  { label: '建国门', action: ACTION_NEXT_STATION },
  // { label: '老板来了', action: ACTION_HIDING },
  { label: '长椿街', action: ACTION_NEXT_STATION },
  { label: '崇文门', action: ACTION_NEXT_STATION },
  { label: '北京站', action: ACTION_NEXT_STATION }
];

const STATIONS_LABELS_B = [
  { label: '我要进地铁', action: ACTION_SWITCH_STATONS },
  { label: '海淀大街', action: ACTION_NEXT_STATION },
  { label: '亚运村', action: ACTION_NEXT_STATION },
  { label: '三元西桥', action: ACTION_NEXT_STATION },
  { label: '八角西路', action: ACTION_NEXT_STATION },
  { label: '翠微路', action: ACTION_NEXT_STATION },
  { label: '府右街', action: ACTION_NEXT_STATION },
  { label: '永安里', action: ACTION_NEXT_STATION },
  // { label: '老板来了', action: ACTION_HIDING },
  { label: '玉泉营', action: ACTION_NEXT_STATION },
  { label: '永定门', action: ACTION_NEXT_STATION },
  { label: '方庄', action: ACTION_NEXT_STATION }
];

const Stations = () => {
  const [stations, setStations] = useState(STATIONS_LABELS_A);
  const processNextDay = useNextDay();

  const stationHandler = (action: string) => {
    if (action === ACTION_SWITCH_STATONS) {
      if (stations[0] === STATIONS_LABELS_A[0]) {
        setStations(STATIONS_LABELS_B);
      } else {
        setStations(STATIONS_LABELS_A);
      }
    } else if (action === ACTION_HIDING) {
      // TODO hide the game
    } else {
      // next day
      processNextDay();
    }
  };

  return (
    <VStack w='full' h={{ base: undefined, md: '40vh' }}>
      <Card>
        <Box py={5} h={{ base: undefined, md: '40vh' }}>
          <Center h={{ base: undefined, md: '3vh' }} fontSize='0.875em'>北京城路线图</Center>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5} w='100%' h={{ base: undefined, md: '37vh' }} p={{ base: 5, md: 10 }}>
            {
              stations && stations.map((station, index) => {
                return <Button key={index} colorScheme='telegram' variant={station.action === ACTION_NEXT_STATION ? 'solid': 'ghost'} onClick={() => stationHandler(station.action)}>{station.label}</Button>
              })
            }
          </SimpleGrid>
        </Box>
      </Card>
    </VStack>
  );
};

export default Stations;