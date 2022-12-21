import * as React from "react"
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'

const Greeting = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
  width: 50%;
`

const Title = styled.h1`
  font-size: 96pt;
  font-weight: 600;
  margin: 0;
  line-height: 1em;
  font-family: Eczar, serif;
`

const ExplainingText = styled.p`
  font-family: Roboto, sans-serif;
  font-size: 16pt;
  margin-bottom: 0px; 
`

const Spacer = styled.div`
  height: ${props => props.height};
`

const JoinButton = styled.a`
  font-family: Eczar, serif;
  font-weight: bold;
  color: black;
  text-decoration: none;
  border-radius: 80px;
  padding: 20px 40px;
  font-size: 24px;
  border: solid 1px black;
  transition: 0.15s ease-in-out;
  
  &:hover {
    background: black;
    color: var(--accent-color);
  }
`

const Cursor = styled.div`
  display: inline-block;
  height: 1em;
  width: 15px;
  background: black;
  align-self: baseline;
  position: relative;
  bottom: -0.1em;
  animation: cursor-blink 1.2s steps(1) infinite;
`

export default function Home() {
  const greetings = [
    'Hello,',
    'Halo,',
    'Hallo,',
    'こんにちは,',
    'Hola,',
    '안녕하세요,'
  ]
  const [TYPING, DELETING, TYPING_TO_DELETING_PAUSE, DELETING_TO_TYPING_PAUSE] = ['forward', 'backward', 'type_to_del', 'del_to_type']

  const [greetingIndex, setGreetingIndex] = useState(0)
  const [greeting, setGreeting] = useState(greetings[greetingIndex])
  const [greetingText, setGreetingText] = useState('')
  const [status, setStatus] = useState(TYPING)

  const typingInterval = useRef()
  const deletingInterval = useRef()
  const typingToDelTimeout = useRef()
  const deletingToTypeTimeout = useRef()
  const typingIndex = useRef(0)
  const typingSpeed = 500
  const backspaceSpeed = 200
  const typeToDelPause = 5000
  const delToTypePause = 1000

  useEffect(() => {
    if (status === DELETING) {
      deletingInterval.current = setInterval(() => {
        if (typingIndex.current <= 0) {
          setStatus(TYPING)

          let number = greetingIndex
          while (number === greetingIndex) {
            number = Math.floor(Math.random() * greetings.length)
          }

          setGreetingIndex(number)
          setGreeting(greetings[greetingIndex])
          clearInterval(deletingInterval.current)
        } else {
          setGreetingText(greeting.slice(0, typingIndex.current - 1))
          typingIndex.current = typingIndex.current - 1
        }
      }, backspaceSpeed)
    }

    return () => {
      clearInterval(deletingInterval.current)
    }
  }, [status])

  useEffect(() => {
    if (status === DELETING_TO_TYPING_PAUSE) {
      deletingToTypeTimeout.current = setTimeout(() => {
        setStatus(TYPING)
      }, delToTypePause)
    }

    return () => {
      clearTimeout(deletingToTypeTimeout.current)
    }
  }, [status])

  useEffect(() => {
    if (status === TYPING_TO_DELETING_PAUSE) {
      typingToDelTimeout.current = setTimeout(() => {
        setStatus(DELETING)
      }, typeToDelPause)
    }

    return () => {
      clearTimeout(typingToDelTimeout.current)
    }
  }, [status])

  useEffect(() => {
    if (status === TYPING) {
      typingInterval.current = setInterval(() => {
        if (typingIndex.current >= greeting.length) {
          setStatus(TYPING_TO_DELETING_PAUSE)
          clearInterval(typingInterval.current)
        }

        setGreetingText(greeting.slice(0, typingIndex.current + 1))
        typingIndex.current = typingIndex.current + 1

      }, typingSpeed)
    }

    return () => {
      clearInterval(typingInterval.current)
    }
  }, [status])

  return <>
    <Greeting>
      <Title>
        {greetingText} <Cursor/><br/>
        we are asin!
      </Title>
      <ExplainingText>
        Asosiasi Informatika Indonesia (ASIN, read <em>“as-in”</em> ) adalah organisasi
        yang didirikan dengan tujuan mewadahi dan mengembangkan
        minat serta bakat masyarakat Indonesia di dalam bidang informatika.
      </ExplainingText>
      <ExplainingText>
        Saat ini, kebanyakan pengurus ASIN berdomisili di Jerman. Namun keanggotaan ASIN
        bersifat terbuka dan tidak terbatas pada tempat tinggal, umur, serta latar belakang.
      </ExplainingText>
      <Spacer height={'100px'}></Spacer>
      <div>
        <JoinButton href={'https://join.asin.dev'}>Join server Discord ASIN!</JoinButton>
      </div>
    </Greeting>
  </>
}
