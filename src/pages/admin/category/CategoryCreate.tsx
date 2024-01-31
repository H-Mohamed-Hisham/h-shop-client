import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

// Component
import ContainerCenter from "components/layout/ContainerCenter";
import BreadCrumbs from "components/common/BreadCrumbs";
import Loader from "components/common/Loader";
import Message from "components/common/Message";

// API
import { createCategory } from "api/";

// Utils
import { categoryCreatePage } from "utils/breadcrumbs";

const ProductCreate = () => {
  // History
  const history = useHistory();

  // State
  const [inputError, setInputError] = useState<any>(null);
  const [createError, setCreateError] = useState<any>(null);

  // Mutation
  const createMutation = useMutation({
    mutationFn: ({ name }: any) =>
      createCategory(["create_category", { name }]),
    onError: (error: any) => {
      setCreateError(error.message);
    },
    onSuccess: (response: any) => {
      const { message, formInputError } = response.data;
      if (formInputError) {
        setInputError(formInputError);
      }
      if (message) {
        history.push("/admin/category/list");
      }
    },
  });

  // Formik
  const form: any = useFormik<any>({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: any) => {
      setCreateError(null);
      setInputError({});
      createMutation.mutate({
        name: values?.name,
      });
    },
  });

  return (
    <ContainerCenter>
      <BreadCrumbs list={categoryCreatePage} />

      <Form onSubmit={form.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.name}
            isInvalid={form?.errors?.name || inputError?.name}
          />

          {form.touched.name && form.errors.name && (
            <Form.Control.Feedback type="invalid">
              {form.errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? <Loader loaderSize="small" /> : "Submit"}
        </Button>
      </Form>

      {createError && (
        <Row>
          <Col md={12} lg={12}>
            <Message message={createError} />
          </Col>
        </Row>
      )}
    </ContainerCenter>
  );
};

export default ProductCreate;
