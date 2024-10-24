'use client'

import styled from 'styled-components'
import { postServeFood } from "./api"

const StyledPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const StyledButton = styled.button`
  background: #333;
  border: none;
  padding: 1rem 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
`

export default function Index() {
  return (
    <StyledPage>
      <StyledButton onClick={postServeFood}>Serve Food !</StyledButton>
    </StyledPage>
  )
}
