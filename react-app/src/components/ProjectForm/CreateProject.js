import ProjectForm from "."

const CreateProject = () => {
  const project = {
    categoryId: '',
    title: '',
    description: '',
    story: '',
    faq: '',
    project_image: '',
    startDate: '',
    endDate: '',
    fundingGoal: '',
    location: ''
  }

  return (
    <ProjectForm
      project={project}
      formType="Create"
    />
  )
}

export default CreateProject;
