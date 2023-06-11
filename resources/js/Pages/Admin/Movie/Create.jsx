import Authenticated from "@/Layouts/Authenticated/Index";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ auth }) {


    const { data, setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        video_url: "",
        thumbnail: "",
        rating: "",
        is_featured: false,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.dashboard.movie.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Create Movie" />
            <h1 className="text-xl">Insert a new Movie</h1>
            <hr className="mb-4" />
            <InputError errors={errors} />
            <form onSubmit={submit}>
                <div className="mb-5">
                    <InputLabel forInput="name" value="Name" />
                    <TextInput
                        type="text"
                        name="name"
                        variant="primary-outline"
                        onChange={handleOnChange}
                        placeholder="Enter the name of the movie"
                        isError={errors.name}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mb-5">
                    <InputLabel forInput="category" value="Category" className="mt-4" />
                    <TextInput
                        type="text"
                        name="category"
                        variant="primary-outline"
                        onChange={handleOnChange}
                        placeholder="Enter the category of the movie"
                        isError={errors.category}
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div className="mb-5">
                    <InputLabel
                        forInput="video_url"
                        value="Video URL"
                        className="mt-4"
                    />
                    <TextInput
                        type="url"
                        name="video_url"
                        variant="primary-outline"
                        onChange={handleOnChange}
                        placeholder="Enter the video url of the movie"
                        isError={errors.video_url}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>


                <div className="mb-5">
                    <InputLabel
                        forInput="thumbnail"
                        value="Thumbnail"
                        className="mt-4"
                    />
                    <TextInput
                        type="file"
                        name="thumbnail"
                        variant="primary-outline"
                        onChange={handleOnChange}
                        placeholder="Insert thumbnail of the movie"
                        isError={errors.thumbnail}
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>

                <div className="mb-5">
                    <InputLabel forInput="rating" value="Rating" className="mt-4" />
                    <TextInput
                        type="number"
                        name="rating"
                        variant="primary-outline"
                        onChange={handleOnChange}
                        placeholder="Enter the rating of the movie"
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>



                <div className="flex flex-row mt-4 items-center">
                    <InputLabel
                        forInput="is_featured"
                        value="Is Featured"
                        className="mr-3 mt-1"
                    />
                    <Checkbox
                        name="is_featured"
                        onChange={(e) =>
                            setData("is_featured", e.target.checked)
                        }
                    />
                    <InputError message={errors.is_featured} className="mt-2" />
                </div>

                <SecondaryButton type="submit" variant="primary" className="mt-4" processing={processing}>
                    Save
                </SecondaryButton>
            </form>
        </Authenticated>
    );
}
