import Authenticated from "@/Layouts/Authenticated/Index";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import { router, Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, movie }) {


    const { data, setData, post, processing, errors } = useForm({
        ...movie
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

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        router.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl">Update Movie : {movie.name}</h1>
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
                        defaultValue={movie.name}
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
                        defaultValue={movie.category}
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
                        defaultValue={movie.video_url}
                        isError={errors.video_url}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>


                <div className="mb-5">
                    <img
                        src={`/storage/${movie.thumbnail}`}
                        alt=""
                        className="w-40"
                    />
                    <InputLabel
                        forInput="thumbnail"
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
                        defaultValue={movie.rating}
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
                        checked={movie.is_featured}
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
