import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,  // Gunakan VStack dari Chakra UI
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  useMediaQuery,  // Gunakan useMediaQuery dari Chakra UI
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 600px)");  // Media query untuk deteksi tampilan mobile

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Center>
      <Box
        w="60vw"
        h="auto"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        boxShadow='dark-lg' 
        p='6' 
        rounded='md'
        my="6"
      >
        {isLoading ? (
          <Skeleton height="300px" />
        ) : (
          <>
            {isMobile ? (
              <VStack spacing="4">
                <Image
                  src={`http://localhost:8000/${book.image}`}
                  alt={book.title}
                  w='35%'
                />
                <VStack w='65%'>
                  <Heading as="h1" fontSize='3xl'>
                    {book.title}
                  </Heading>
                  <Text fontSize="l" fontWeight="semibold" color="gray.500">
                    {book.author}
                  </Text>
                  <Text fontSize="l" fontWeight="semibold" color="gray.500">
                    {book.publisher}
                  </Text>
                  <Text fontSize="l" fontWeight="semibold" color="gray.500">
                    {book.year} | {book.pages} pages
                  </Text>

                  {localStorage.getItem('token') && (
                  <HStack spacing="2">
                    <Popover>
                      <PopoverTrigger>
                        <Button colorScheme="red">Delete</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this book?
                        </PopoverBody>
                        <Button onClick={handleDeleteBook} colorScheme="red">
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Link to={`/editbook/${id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </HStack>
                )}
                </VStack>
              </VStack>
            ) : (
              <HStack spacing="4">
                <Image
                  src={`http://localhost:8000/${book.image}`}
                  alt={book.title}
                  w='35%'
                />
                <VStack w='65%'>
                  <Heading as="h1" fontSize='5xl'>
                    {book.title}
                  </Heading>
                  <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                    {book.author}
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                    {book.publisher}
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold" color="gray.500">
                    {book.year} | {book.pages} pages
                  </Text>

                  {localStorage.getItem('token') && (
                  <HStack spacing="2">
                    <Popover>
                      <PopoverTrigger>
                        <Button colorScheme="red">Delete</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this book?
                        </PopoverBody>
                        <Button onClick={handleDeleteBook} colorScheme="red">
                          Delete
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Link to={`/editbook/${id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </HStack>
                )}
                </VStack>
              </HStack>
            )}
          </>
        )}
      </Box>
    </Center>
  );
}
