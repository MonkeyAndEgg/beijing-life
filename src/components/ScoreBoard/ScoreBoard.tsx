import { Button, Divider, Flex, Heading, List, ListItem, VStack, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";
import { UserState } from "../../../redux/reducers/user";
import { BASE_PATH } from "../../constants/app";
import { AssetsReputation } from "../../constants/AssetRep";
import { ReputationMap } from "../../constants/reputation";
import Card from "../Card/Card";

export default function ScoreBoard() {
  const user: UserState = useSelector((state: RootState) => state.user);
  const [totalAssets, setTotalAssets] = useState(0);
  const [assetRep, setAssetRep] = useState(AssetsReputation.UltraPoor);

  useEffect(() => {
    let sum = Math.floor(user.cash + user.deposit);
    sum = sum - user.debt;
    setTotalAssets(sum);
  }, [user.cash, user.deposit, user.debt, setTotalAssets])

  useEffect(() => {
    let rep = AssetsReputation.Zero;
    if (totalAssets < -50000 ) {
      rep = AssetsReputation.UltraPoor;
    } else if (totalAssets < 0) {
      rep = AssetsReputation.Poor;
    } else if (totalAssets === 0) {
      rep = AssetsReputation.Zero;
    } else if (totalAssets > 0 && totalAssets < 100000) {
      rep = AssetsReputation.LessThanTenW;
    } else if (totalAssets < 500000) {
      rep = AssetsReputation.LessThanFiftyW;
    } else if (totalAssets < 1000000) {
      rep = AssetsReputation.LessThanHundredW;
    } else {
      rep = AssetsReputation.UltraRich
    }
    setAssetRep(rep);
  }, [totalAssets, setAssetRep])

  const restartHandler = () => {
    if (window.location.href.includes('localhost')) {
      window.location.href = '/';
    } else {
      window.location.href = 'https://monkeyandegg.github.io/beijing-life/';
    }
  };

  return (
    <Flex p={10} justifyContent="center" alignItems="center" h="100vh">
      <Flex maxW="600px">
        <Card>
          <VStack justifyContent="center" p="10px">
            <VStack>
              <Heading mb={5}>
                ????????????
              </Heading>
              <List spacing={2} pb={5}>
                <ListItem>
                  ???????????? ???{totalAssets}
                </ListItem>
                <ListItem>
                  ?????????????????????{ ReputationMap.get(user.reputation) }
                </ListItem>
                <ListItem>
                  ?????????????????????{ assetRep }
                </ListItem>
              </List>
            </VStack>

            <Divider />

            <VStack>
              <Heading mb={5}>
                ??????
              </Heading>
              {
                totalAssets >= 0 && user.health > 0 ? (
                  <VStack>
                    <Text>
                      ????????????????????????????????????????????????????????????????????????
                    </Text>
                  </VStack>
                ) : (
                  <VStack>
                    <Image w={40} src={`${BASE_PATH}/images/africa.jpg`} alt="??????????????????" />
                    <Text>
                      ???????????????????????????????????????????????????????????????????????????????????????????????????
                    </Text>
                  </VStack>
                )
              } 
              {
                user.health === 0 && (
                  <VStack>
                    <Image w={40} src={`${BASE_PATH}/images/die.jpg`} alt="??????" />
                    <Text>
                      ?????????????????????????????????????????????
                    </Text>
                  </VStack>
                )
              }
            </VStack>
            
            <Divider />
            
            <VStack>
              <Heading mb={5}>??????????????????</Heading>
              <Button colorScheme='blue' onClick={restartHandler}>
                ??????
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Flex>
    </Flex>
  );
}