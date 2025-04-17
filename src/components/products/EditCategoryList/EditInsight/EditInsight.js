import React, {  useEffect, useState } from 'react'
// import { DataContext } from '../../../../contexts/Datacontext'
import { useParams } from 'react-router-dom'
import optionalImage from '../../../../assets/images/product-card-img-1.png'
import SecondaryHeader from '../../../secondaryheader/SecondaryHeader'
import FormInput from '../../../forminput/FormInput'
import api from '../../../../api/api'
import { LuPencil } from 'react-icons/lu'

const EditInsight = () => {
  // const { validate } = useContext(DataContext)
  const { id } = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  // const userData = JSON.parse(localStorage.getItem('userdata'))
  const [category, setCategory] = useState({})
  const [categoryImage , setCategoryImage] = useState("")
  const [filePath , setFilePath] = useState("")
  const [counterRefresh,setCounterRefresh]  = useState(true)
  console.log("editinsight")

  useEffect(()=>{
    if (typeof category?.categoryImage === 'string') {
      setFilePath(category.categoryImage.slice(2));
    }
  },[category.categoryImage])

  useEffect(() => {
    try {
      setCategoryImage(require(`../../../../assets${filePath}`))
    } catch (error) {
      console.log(error.message)
      setCategoryImage(optionalImage)
    }
  }, [filePath])

  const [values, setValues] = useState({
    categoryname: "",
  })

  const errors = {}
  const inputAttr = [
    {
      id: "categoryname",
      name: "categoryname",
      label: "Category Name*",
      type: 'text',
      errMsg: "",
      pattern: '^[a-zA-Z0-9_]{3,26}$'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      let imagePath = ""; // Use `let` instead of `const`
  
      if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
  
          const imageResponse = await api.post('/admin/categoryimageupload', formData);
          setFilePath(imageResponse.data.path);
          imagePath = imageResponse.data.path; // Correctly assign the path from the response
      }
  
      const data = {
          mode: "update",
          recordid: id,
          categoryName: values.categoryname || category.categoryName,
          categoryImage: imagePath || category.categoryImage, // Use the uploaded path or existing path
      };
  
      console.log(data);
  
      const response = await api.post('/admin/upsetcategory', data);
      if(response.status===200){
        setCounterRefresh(!counterRefresh)
      }
      console.log(response);
  } catch (error) {
      console.error("Upload failed:", error);
  }
  
};

  useEffect(() => {
    async function getCategoryById() {
      try {
        const response = await api.get(`/admin/getEditCategory?mode=update&recordid=${id}`)
        if (response.data.status === "OK") {
          setCategory(response.data.responsedata)
          setValues({
            categoryname: response.data.responsedata.categoryName,
          })
        }
        else {
          console.log(response.data.message)
        }
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getCategoryById()
  }, [id,counterRefresh])


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <section className='edit-profile'>
      <SecondaryHeader
        title={'Edit Category'}
      />
      <main className='edit-profile-content'>
        <div className='profile-picture'>
          <div className='edit-product-change-outline'>
            <div className='product-img-change'>
              <img src={categoryImage} alt='profile' />
            </div>
            <div className='edit-btn-outline'>
              <div className='profile-edit-btn'>
                <input type='file' className='fileinput' onChange={handleFileChange}/>
                <LuPencil className='pencil-icon' />
              </div>
            </div>
          </div>
        </div>
        <form className='my-form' onSubmit={handleSubmit}>
          {
            inputAttr.map((attr, index) => (
              <FormInput
                {...attr}
                key={index}
                value={values[attr.name]}
                values={values}
                setValues={setValues}
                inputName={(attr.name)}
                errors={errors}
              />
            ))
          }
          <button className='update-profile-btn' type='submit'>
            Update Category
          </button>
        </form>
      </main>
    </section>
  )
}

export default EditInsight
