'use client'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const socket = io('http://localhost:3001', {
  reconnectionDelayMax: 10000,
})

const INITIAL_MESSAGES = [
  {
    user: 'bot',
    message: 'Escribe el número de las opciones siguientes para ayudarte.',
  },
  {
    user: 'bot',
    message: '1. Guiarte',
  },
  {
    user: 'bot',
    message: '2. Reportar bug o error ',
  },
  {
    user: 'bot',
    message: '3. Preguntas frecuentes',
  },
]

function ChatBotBox() {
  const [messages, setMessages] = useState([
    {
      user: 'bot',
      message: 'Hola!,  soy un bot asistente.',
    },
  ])

  const [isConnected, setIsConnected] = useState(socket.connected)

  const [message, setMessage] = useState('')

  const sendMessageToServer = () => {
    socket.emit('newMessage', { message, context: 'initial' })
  }

  useEffect(() => {
    socket.on('onMessage', (message) => {
      setMessages(
        (prevMessages) =>
          [
            ...prevMessages,
            {
              user: 'bot',
              message,
            },
          ] as never[]
      )
    })
  }, [])

  useEffect(() => {
    let chatMessages = document.getElementById('chatMessages')!
    chatMessages.scrollTop = chatMessages.scrollHeight
    if (INITIAL_MESSAGES.length > 0) {
      const timer = setTimeout(() => {
        const nextMessage = INITIAL_MESSAGES.shift()
        setMessages((prevMessages) => [...prevMessages, nextMessage] as never[])
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [messages])

  return (
    <div className="flex flex-col content-between justify-between w-60 h-72 border-1 border-solid rounded-md">
      <div className="flex flex-row items-center justify-between rounded-t-md p-1 px-2 text-white font-medium bg-blue-600">
        <div>ChatBot</div>
        <div>x</div>
      </div>
      <div
        className="w-full mt-auto overflow-auto scroll-smooth"
        id="chatMessages"
      >
        {messages.map((m: { user: string; message: string }, index) => {
          if (m.user === 'bot') {
            return (
              <div key={index} className="p-1 pr-2">
                <div className="flex flex-row items-center gap-2">
                  <div>
                    <Image
                      src={
                        'https://www.techopedia.com/wp-content/uploads/2023/03/6e13a6b3-28b6-454a-bef3-92d3d5529007.jpeg'
                      }
                      alt="bot img"
                      className="rounded-full"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="bg-gray-200 rounded-md px-2 py-1 w-full">
                    <p className="text-xs leading-4">{m.message}</p>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="p-1 pr-2 flex justify-end">
                <div className="flex flex-row items-center gap-2">
                  <div className="bg-blue-500 rounded-md px-2 py-1">
                    <p className="text-xs text-white leading-4">{m.message}</p>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
      <div>
        <Input
          placeholder="Preguntar..."
          radius="sm"
          className="rounded-lg"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessageToServer()
              setMessage('')
              setMessages(
                (prevMessages) =>
                  [
                    ...prevMessages,
                    {
                      user: 'user',
                      message,
                    },
                  ] as never[]
              )
            }
          }}
        />
      </div>
    </div>
  )
}

export default ChatBotBox
