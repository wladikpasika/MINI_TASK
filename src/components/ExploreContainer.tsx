import "./ExploreContainer.css";
import UserList from "./UserList";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <UserList />
    </div>
  );
};

export default ExploreContainer;
