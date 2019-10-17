import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import axios from "axios"
import { Flex, Text, Box, Image } from "@chakra-ui/core"

interface Repo {
  id: number
  url: string
  owner: { avatar_url: string; login: string }
}

async function fetchPopularRepos(language: string): Promise<Repo[]> {
  var url = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  const { data } = await axios.get(url)
  return data.items
}

const App: React.FC = () => {
  const [state, setState] = useState<Repo[]>([])

  useEffect(() => {
    fetchPopularRepos("javaScript").then(res => {
      setState(res)
    })
  }, [])
  console.log(state)
  return (
    <Flex flexWrap="wrap" bg="gray.100" h="100vh">
      {state.map(r => {
        return (
          <Box m="3" boxShadow="xl" bg="white">
            <Flex>
              <Text p="2" mx="auto">
                {r.id}
              </Text>
            </Flex>
            <Image objectFit="cover" w="40" h="40" src={r.owner.avatar_url} alt={`Avatar for ${r.owner.login}`} />
          </Box>
        )
      })}
    </Flex>
  )
}

export default App
