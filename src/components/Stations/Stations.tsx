import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import Card from "../Card/Card";

const Stations = () => {

  return (
    <VStack w='full' h='35vh'>
      <Card>
        <TableContainer w='100%' h='35vh'>
          <Table h="30vh" variant='unstyled' size='sm'>
            <TableCaption placement="top">北京地铁站</TableCaption>
            <Tbody>
              <Tr>
                <Td>
                  <Button>我要逛京城</Button>
                </Td>
                <Td>
                  <Button>西直门</Button>
                </Td>
                <Td>
                  <Button>积水潭</Button>
                </Td>
                <Td>
                  <Button>东直门</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Button>苹果园</Button>
                </Td>
                <Td>
                  <Button>公主坟</Button>
                </Td>
                <Td>
                  <Button>复兴门</Button>
                </Td>
                <Td>
                  <Button>建国门</Button>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Button>老板来了</Button>
                </Td>
                <Td>
                  <Button>长椿街</Button>
                </Td>
                <Td>
                  <Button>崇文门</Button>
                </Td>
                <Td>
                  <Button>北京站</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

        </TableContainer>
      </Card>
    </VStack>
  );
};

export default Stations;