import LoadingPage from "components/Loading";
import useGetTodoList from "hooks/todos/useGetTodoList";
import * as React from "react";

export interface IeltsSpeakingProps {}

export default function IeltsSpeaking(props: IeltsSpeakingProps) {
  const { data, isLoading } = useGetTodoList();
  if (isLoading) {
    return <div>Loading....</div>;
  }
  return <>a</>;
}
