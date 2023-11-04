import { Card, Heading, Image, Text, VStack, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Flex>
      <Link to={`/books/${id}`}>
      <Card key={id} my={4} p={4} cursor='pointer' boxShadow='dark-lg' rounded='md' bg='white' flex='1'>
        <VStack>
          <Heading size={"md"}>
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image w={24} h={24} src={`http://localhost:8000/${image}`} />
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
      </Link>
    </Flex>
  );
}