import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { loadSingleProjectThunk } from "../../store/project";
import ProjectForm from ".";
import { Redirect } from "react-router-dom";

const EditProjectForm = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleProjectThunk(projectId))
  }, [dispatch, projectId])

  const sessionUser = useSelector((state) => state.session.user);
  const project = useSelector(state => state.projects.singleProject);
  // console.log('sessionID and project creator ID cat ID', sessionUser.id, project.creatorId, project.categoryId)

  if (project?.creatorId === undefined) {
    return <div>Loading...</div>;
  }
  if (sessionUser?.id !== project?.creatorId) {
    return <Redirect to="/" />
  }
  if (!sessionUser) {
    return <Redirect to="/" />
  }

  // if (sessionUser.id !== project.creatorId ) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      {project && (
        <>
          <ProjectForm
            project={project}
            formType="Update"
          />
        </>
      )}
    </>
    // Object.keys(spot).length > 1 && (
    //   <>
    //     <ProjectForm
    //       spot={spot}
    //       formType="Update"
    //     />
    //   </>
    // )
  )
}

export default EditProjectForm;
