from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Contact
from api.serializers import ContactSerializer


class ContactList(APIView):
    def get(self, request):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ContactDetail(APIView):

    # def get_object(self, pk):
    #     try:
    #         return Course.objects.get(id=pk)
    #     except Course.DoesNotExist:
    #         raise Http404
    #
    # def get(self, request, pk):
    #     course = self.get_object(pk)
    #     serializer = CourseSerializer(course)
    #     return Response(serializer.data)

    def put(self, request, pk):
        contact = self.get_object(pk)
        serializer = ContactSerializer(instance=contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        contact = self.get_object(pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class LectureList(APIView):
#     def get(self, request, pk):
#         course = Course.objects.get(id=pk)
#         lectures = course.lecture_set.all()
#         serializer = LectureSerializer(lectures, many=True)
#         return Response(serializer.data)
#     def post(self, request,pk):
#         serializer= LectureSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#
#
#
# class LessonList(APIView):
#     def get(self,request,pk):
#         course = Course.objects.get(id=pk)
#         lessons = course.lesson_set.all()
#         serializer = LessonSerializer(lessons, many=True)
#         return Response(serializer.data)
#     def post(self, request):
#         serializer = LessonSerializer(data= request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#
