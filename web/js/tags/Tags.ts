import twitter_txt from 'twitter-text';
import {isPresent} from '../Preconditions';
import {Optional} from '../util/ts/Optional';
import {Tag} from './Tag';
import {TypedTag} from './TypedTag';

export class Tags {

    public static assertValid(label: string) {

        if (!this.validate(label).isPresent()) {
            throw new Error("Invalid tag: " + label);
        }

    }

    public static validate(label: string): Optional<string> {

        if (!isPresent(label)) {
            return Optional.empty();
        }

        if (!label.startsWith('#')) {
            label = '#' + label;
        }

        const strippedLabel = this.stripTypedLabel(label);

        if ( ! strippedLabel.isPresent()) {
            return Optional.empty();
        }

        if (twitter_txt.isValidHashtag(strippedLabel.get())) {
            return Optional.of(label);
        }

        return Optional.empty();

    }

    public static validateTag(tag: Tag): Optional<Tag> {

        if (this.validate(tag.label).isPresent()) {
            return Optional.of(tag);
        }

        return Optional.empty();

    }

    /**
     * Return true if all the tags are valid.  If no tags are given we return
     * true as the input set had no valid tags.
     */
    public static validateTags(...tags: Tag[]): boolean {

        return tags.map(tag => this.validateTag(tag).isPresent())
                   .reduce((acc, curr) => ! acc ? false : curr, true);

    }

    /**
     * Return tags that are invalid.
     * @param tags
     */
    public static invalidTags(...tags: Tag[]): Tag[] {
        return tags.filter(tag => ! this.validateTag(tag).isPresent());
    }

    public static toMap(tags: Tag[]) {

        const result: { [id: string]: Tag } = {};

        for (const tag of tags) {
            result[tag.id] = tag;
        }

        return result;

    }

    public static toIDs(tags: Tag[]) {
        return tags.map(current => current.id);
    }

    /**
     * We support foo:bar values in tags so that we can have typed tags.
     * For example: type:book or deck:fun or something along those lines.
     *
     */
    public static stripTypedLabel(label: string): Optional<string> {

        const match = label.match(/:/g);

        if (match && match.length > 1) {
            return Optional.empty();
        }

        return Optional.of(label.replace(/^#([^:/]+):([^:]+)$/g, '#$1$2'));

    }

    public static parseTypedTag(value: string): Optional<TypedTag> {

        value = value.replace("#", "");
        const split = value.split(":");

        return Optional.of({
            name: split[0],
            value: split[1]
        });

    }

}

