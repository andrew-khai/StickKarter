import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProjectsThunk, unloadSingleProject, unloadSingleProjectThunk } from "../../store/project";
import { loadCurrentUserThunk } from "../../store/user";
import { useParams } from "react-router-dom";
import ProjectFeaturedItem from "../ProjectFeatured";
import RecommendedProjects from "../RecommendedProjects";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./CategoryPage.css"

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  // const sessionUser = useSelector(state => state.session.user)

  useEffect(async () => {
    await dispatch(loadProjectsThunk());
    await dispatch(unloadSingleProjectThunk());

    // if (sessionUser) {
    //   await dispatch(loadCurrentUserThunk())
    // }
  }, [dispatch, categoryId])

  const projects = useSelector(state => Object.keys(state.projects.projects).map(project => {
    return state.projects.projects[project]
  }))
  // console.log(projects, categoryId)
  const categoryProjects = projects.filter(project => project.categoryId == categoryId)
  // console.log(categoryProjects)

  const recommendedProjects = categoryProjects.slice(1, 10)

  // if (categoryProjects.length === 0) {
  //   return <Redirect to="/" />
  // }

  return (
    <>
      {categoryProjects && categoryProjects.length > 0 ?
        <div className="category-projects-main">
          <div className="projects-category-div">
            <h1 style={{marginBottom: "0px", fontWeight: "light"}}>{categoryProjects[0].category?.name}</h1>
            <p style={{marginBottom: "0px", color: "#656969"}}>{categoryProjects[0].category?.description}</p>
          </div>
          <div className="projects-show-container">
            <ProjectFeaturedItem project={categoryProjects[0]} />
            <RecommendedProjects projects={recommendedProjects} />
          </div>
        </div>
        :
        <h1 style={{ textAlign: "center" }}>NO CATEGORY FOUND</h1>
      }
    </>
  )
}

export default CategoryPage;
