import { Text, Center } from "native-base";

export function Signin() {
    return (
        <Center 
            flex={1} 
            bgColor="black"
        >
            <Text 
                color="white" 
                fontSize={24}
                fontFamily="heading"
            >
               Signin
            </Text>
        </Center>
    )
}