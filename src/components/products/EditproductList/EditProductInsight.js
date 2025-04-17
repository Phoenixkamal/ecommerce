import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import optionalImage from '../../../assets/images/product-card-img-1.png'
import SecondaryHeader from '../../secondaryheader/SecondaryHeader'
import { LuPencil } from 'react-icons/lu'
import api from '../../../api/api'
import FormInput from '../../forminput/FormInput'
import { DataContext } from '../../../contexts/Datacontext'

const EditProductInsight = () => {
  const { categories } = useContext(DataContext)
  const { id } = useParams()
  const [selectedFile, setSelectedFile] = useState(null)
  const [product, setProduct] = useState({})
  const [productImage, setProductImage] = useState("")
  const [filePath, setFilePath] = useState("")
  const [productVarients, setProductVarients] = useState([])
  const categoryMap = useMemo(() => new Map(), []);
  const warehouseMap = useMemo(() => new Map(), []);
  const [units, setUnits] = useState([])
  const [warehouse, setwarehouse] = useState([])
  const [categorydrpdwn, setCategorydrpdwn] = useState([])
  const [warehousedrpdwn, setWarehousedrpdwn] = useState([])
  const [isDefaultId, setIsDefaultId] = useState("")
  const [curProductVarients, setCurProductVarients] = useState({})
  const [categorySelectedOption, setCategorySelectedOption] = useState();
  const [warehouseSelectedOption, setWarehouseSelectedOption] = useState();
  const [unitsSelectedOption, setUnitsSelectedOption] = useState();
  const [isDefaultVarient, setIsDefaultVarient] = useState(true)
  const [addVariantsClkd, setAddVariantsClkd] = useState(false)
  const [counterRefresh,setCounterRefresh] = useState(false)

  const [values, setValues] = useState({
    productname: "",
  })
  const [variantValues, setVarientValues] = useState({
    sellingprice: "",
    retailprice: "",
    varientname: "",
    recordId: ""
  })

  const errors = {}
  const inputAttr = [
    {
      id: "productname",
      name: "productname",
      label: "Product Name*",
      type: 'text',
      errMsg: "",
    }
  ]

  const varientInpAttr = [
    {
      id: "sellingprice",
      name: "sellingprice",
      label: "Sellling Price*",
      type: 'number',
      errMsg: "",
    },
    {
      id: "retailprice",
      name: "retailprice",
      label: "Maximum Retail Price*",
      type: 'number',
      errMsg: "",
    },

    {
      id: "varientname",
      name: "varientname",
      label: "Varient Name*",
      type: 'number',
      errMsg: "",
    }
  ]

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategorySelectedOption(event.target.value);
  };
  const handleWarehouseChange = (event) => {
    setWarehouseSelectedOption(event.target.value);
  };
  const handleUnitsChange = (event) => {
    setUnitsSelectedOption(event.target.value);
  };

  function handleVarientRadioChange(id, index) {
    setIsDefaultId(id)
    setCurProductVarients(productVarients[index])
    setUnitsSelectedOption(productVarients[index].unit)
  }

  function handleDefaultVarient(value) {
    setIsDefaultVarient(value)
    console.log(value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('categoryName', (product.category).replace(/\s+/g, ''))
    categories.forEach((category) => {
      categoryMap.set(category.recordId, category.categoryName)
    })

    try {
      let imagePath = "";

      if (selectedFile) {
        const imageResponse = await api.post('/admin/productimageupload', formData);
        setFilePath(imageResponse.data.path);
        imagePath = imageResponse.data.path;
      }
      console.log(filePath)

      const productData = {
        productDetail: {
          category: categoryMap.get(categorySelectedOption),
          productName: values.productname,
          productImagePath: imagePath || filePath,
          categoryRId: categorySelectedOption,
          warehouseId: warehouseSelectedOption,
          productId: product.productId
        },
        varients: [
          {
            recordId: curProductVarients.recordId,
            varient: variantValues.varientname,
            unit: unitsSelectedOption,
            sellingPrice: variantValues.sellingprice,
            isDefaultVarient: isDefaultVarient,
            retailPrice: variantValues.retailprice,
            productId: product.productId
          }
        ],
      };
      console.log(productData)

      const response = await api.post('/admin/updateproduct', productData)
      console.log(response)
      setCounterRefresh(!counterRefresh)
    } catch (error) {
      console.error("Upload failed:", error);
    }

  };
  function handleToggleVariant(){
    setAddVariantsClkd(true)
    setVarientValues({
      sellingprice: "",
      retailprice: "",
      varientname: "",
      recordId: ""
    })
    setUnitsSelectedOption("")
  }

  async function handleAddVariants() {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('categoryName', (product.category).replace(/\s+/g, ''))
    categories.forEach((category) => {
      categoryMap.set(category.recordId, category.categoryName)
    })

    try {
      let imagePath = "";

      if (selectedFile) {
        const imageResponse = await api.post('/admin/productimageupload', formData);
        setFilePath(imageResponse.data.path);
        imagePath = imageResponse.data.path;
      }
      console.log(filePath)

      const productData = {
        mode:"addnew",
        category: categoryMap.get(categorySelectedOption),
        productName: values.productname,
        productImagePath: imagePath || filePath,
        categoryRId: categorySelectedOption,
        warehouseId: warehouseSelectedOption,
        productId: product.productId,
        varientName: variantValues.varientname,
        unit: unitsSelectedOption,
        sellingPrice: variantValues.sellingprice,
        isDefaultVarient: isDefaultVarient,
        retailPrice: variantValues.retailprice
      };
  
       await api.post('/admin/UpsetProduct', productData)
      setCounterRefresh(!counterRefresh)
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }


  useEffect(() => { setAddVariantsClkd(false) }, [curProductVarients])

  useEffect(() => {
    productVarients.forEach((varient, index) => {
      if (varient.isDefaultVarient) {
        setCurProductVarients(productVarients[index])
        setIsDefaultId(varient.recordId)
      }
    })
    console.log(productVarients)
  }, [productVarients])


  useEffect(() => {
    setVarientValues(
      {
        sellingprice: curProductVarients.sellingPrice || "",
        retailprice: curProductVarients.retailPrice || "",
        varientname: curProductVarients.varient || "",
        recordId: curProductVarients.recordId || ""
      }
    )
    setIsDefaultVarient(curProductVarients.isDefaultVarient)
  }, [curProductVarients])

  useEffect(() => {
    setCategorySelectedOption(product.categoryRId)
    setWarehouseSelectedOption(product.warehouseId)
    if (product.unit) {
      setUnitsSelectedOption(product.unit);
    }
  }, [product.categoryRId, product.warehouseId, product])

  useEffect(() => {
    async function getProductDetails() {
      try {
        const response = await api.get(`/user/productdetails?productid=${id}`)
        setProduct(response.data.responsedata.productDetail)
        setProductVarients(response.data.responsedata.varients)
        setValues({
          productname: response.data.responsedata.productDetail.productName,
        })
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getProductDetails()
  }, [id,counterRefresh])

  useEffect(() => {
    async function getWarehouseDetails() {
      try {
        const response = await api.get('/admin/warehouse')
        setwarehouse(response.data.responsedata)
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getWarehouseDetails()
  }, [])
  useEffect(() => {
    async function getAllUnits() {
      try {
        const response = await api.get('/admin/Units')
        setUnits(response.data.responsedata[0].units)
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getAllUnits()
  }, [])

  useEffect(() => {
    warehouse.forEach((details) => {
      warehouseMap.set(details.recordId, details.warehouseName)
    })
    setWarehousedrpdwn(Array.from(warehouseMap))
  }, [warehouse, warehouseMap])

  useEffect(() => {
    categories.forEach((category) => {
      categoryMap.set(category.recordId, category.categoryName)
    })
    setCategorydrpdwn(Array.from(categoryMap))
  }, [categories, categoryMap])

  useEffect(() => {
    if (typeof product?.productImagePath === 'string') {
      setFilePath(product.productImagePath);
    }
  }, [product.productImagePath])

  useEffect(() => {
    console.log(`../../../assets${filePath.slice(2)}`)
    try {
      setProductImage(require(`../../../assets${filePath.slice(2)}`))
    } catch (error) {
      console.log(error.message)
      setProductImage(optionalImage)
    }
  }, [filePath])


  return (
    <section className='edit-profile mb-5'>
      <SecondaryHeader
        title={'Edit Products'}
      />
      <main className='edit-profile-content'>
        <div className='profile-picture'>
          <div className='edit-product-change-outline'>
            <div className='product-img-change'>
              <img src={productImage} alt='profile' />
            </div>
            <div className='edit-btn-outline'>
              <div className='profile-edit-btn'>
                <input type='file' className='fileinput' onChange={handleFileChange} />
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
          <div className="my-form-group">
            <label>Select Category</label>
            <select
              id="categorydropdown"
              value={categorySelectedOption}
              onChange={handleCategoryChange}
              className='inp-select'
              disabled={addVariantsClkd}
            >
              <option value="">--Select an option--</option>
              {
                categorydrpdwn.map(([key, value]) =>
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
              }
            </select>
            <label className='mt-3'>Select Warehouse</label>
            <select
              id="warehousedropdown"
              value={warehouseSelectedOption}
              onChange={handleWarehouseChange}
              className='inp-select'
            >
              <option value="">--Select an option--</option>
              {
                warehousedrpdwn.map(([key, value]) =>
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
              }
            </select>
            <div className='my-4 edit-prod-insight-varients'>
              <div className='align-self-center'>Select Variants</div>
              <div className='edit-prod-varients'>
                {
                  productVarients &&
                  productVarients.map((varient, index) => (
                    <label className='product-list-variance  product-insight-variance mx-2' key={index}>
                      <input className='variance-radio-input' type="radio" name={`radio-btn${index}`} checked={varient.recordId === isDefaultId} onChange={() => { handleVarientRadioChange(varient.recordId, index) }} />
                      <span className={`category-name save-address-option mr-2  insight-save-address-option`}>
                        <span className='mr-1'>{varient.varient}</span>{varient.unit}
                      </span>
                    </label>
                  ))
                }
              </div>
            </div>
            {
              varientInpAttr.map((attr, index) => (
                <FormInput
                  {...attr}
                  key={index}
                  value={variantValues[attr.name]}
                  values={variantValues}
                  setValues={setVarientValues}
                  inputName={(attr.name)}
                  errors={errors}
                />
              ))
            }
            <label className='mt-3'>Select Unit</label>
            <select
              id="unitsdropdown"
              value={unitsSelectedOption}
              onChange={handleUnitsChange}
              className='inp-select'
            >
              <option value="">--Select an option--</option>
              {
                units.map((unit, index) =>
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                )
              }
            </select>
            <div className='mt-4 default-varient'>
              <label className='mr-5'>DefaultVariant</label>
              <label className="edit-custom-radio">
                <input type="radio" name="default-varient" value={true} checked={isDefaultVarient === true} onChange={() => handleDefaultVarient(true)} />
                <span className="edit-radio-mark"></span>
                <span className='edit-custom-radio-label'>Yes</span>
              </label>
              <label className="edit-custom-radio">
                <input type="radio" name="default-varient" value={false} checked={isDefaultVarient === false} onChange={() => handleDefaultVarient(false)} />
                <span className="edit-radio-mark"></span>
                <span className='edit-custom-radio-label'>No</span>
              </label>
            </div>
          </div>
          <div className='my-4 edit-prod-insight-varients'>
            <div className='align-self-center'>Add Variants</div>
            <button className='black-btn' style={{fontSize:"12px"}} type='button' onClick={handleToggleVariant}>Add Variants</button>
          </div>
          {
            addVariantsClkd ?
              <button className='update-profile-btn mb-5' type='button' onClick={handleAddVariants}>
                Add Variants
              </button>
              :
              <button className='update-profile-btn mb-5' type='submit'>
                Update Products
              </button>
          }
        </form>
      </main>
    </section>
  )
}

export default EditProductInsight

