import { Card, Heading, Image, Text, VStack, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card
        key={id}
        my={4}
        p={{ base: 6, md: 8 }}
        cursor='pointer'
        boxShadow='dark-lg'
        rounded='md'
        bg='white'
        w={{ base: "100%", md: "auto" }} 
      >
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
  );
}